import { BadRequestException, Body, Controller, Post, Headers, Res } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';
import { ForgotPasswordDto } from './dtos/forgot-password.dto';
import { ResetPasswordDto } from './dtos/reset-password.dto';
import { UpdatePasswordDto } from './dtos/update-password.dto';
import { CryptoService } from '../services/crypto.service';
import { EmailService } from '../services/email.service';
import { ApiBadRequestResponse, ApiOkResponse, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { validationApiResOptions } from '../dto/validation-error.dto';
import { Logger } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(
    private readonly userService: UsersService,
    private readonly cryptoService: CryptoService,
    private readonly emailService: EmailService,
    private readonly configService: ConfigService
  ) { }

  @Post('/register')
  @ApiOperation({ summary: 'Register User' })
  @ApiOkResponse({
    description: 'User Created Successfully',
  })
  @ApiResponse(validationApiResOptions)
  @ApiBadRequestResponse({
    description: 'Bad Request',
  })
  async register(@Body() body: CreateUserDto) {
    this.logger.log('Registering user');
    const hashPassword = await this.cryptoService.hashPassword(body.password);
    const resp = await this.userService.create({
      ...body,
      email: body.email.trim().toLowerCase(),
      password: hashPassword,
    });
    if ('error' in resp) {
      this.logger.error('Error creating user', resp.error);
      throw new BadRequestException(resp.error);
    }
    return {
      message: "User Created Successfully",
    };
  }

  @Post('/login')
  @ApiResponse(validationApiResOptions)
  async login(@Body() body: LoginUserDto, @Res({ passthrough: true }) response) {
    this.logger.log('User login attempt');
    const email = body.email.trim().toLowerCase();
    const user = await this.userService.findByEmail(email, { email: 1, password: 1 });
    if (!user) {
      this.logger.warn('Invalid email');
      throw new BadRequestException('Invalid email');
    }
    const isMatched = await this.cryptoService.validatePassword(body.password, user.password);
    if (!isMatched) {
      this.logger.warn('Invalid password');
      throw new BadRequestException('Invalid password');
    }
    const jwtPayload = {
      userEmail: email,
      userId: user._id,
    };
    const accessToken = await this.cryptoService.getAccessToken(jwtPayload);
    // const refreshToken = await this.cryptoService.getRefreshToken(jwtPayload);
    response.cookie('accessToken', accessToken, {
      httpOnly: true,  // Prevents JavaScript access
      secure: process.env.NODE_ENV !== 'development', // HTTPS only in production
      sameSite: 'strict', // Protects against CSRF
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    return {
      success: `User is logged in with email: ${email}`,
      accessToken,
      // refreshToken,
      userId: user._id,
    };
  }

  @Post('/forgot-password')
  @ApiResponse(validationApiResOptions)
  async forgotPassword(@Body() body: ForgotPasswordDto, @Headers() headers) {
    this.logger.log('Forgot password request');
    const email = body.email.trim().toLowerCase();
    const user = await this.userService.findByEmail(email);

    if (!user) {
      this.logger.warn('No user with this email');
      throw new BadRequestException('No user with this Email');
    }

    const response = await this.cryptoService.getResetToken(user._id);
    const message = `You are receiving this because you requested a password reset.\n
           Please click on the following link, or paste it into your browser to reset your password:\n
           ${this.configService.get('FRONTED_URL')}/auth/reset-password/${response.token} 
           If you did not request this, please ignore this email.`;
    await this.emailService.sendEmail({
      to: email,
      subject: 'Password Reset Link',
      text: message,
    });
    await this.userService.update(user._id, { passwordResetData: response });

    return {
      message: 'Successfully sent password reset email to your email',
    };
  }

  @Post('/reset-password')
  @ApiResponse(validationApiResOptions)
  @ApiOkResponse({
    description: 'Successfully updated user password',
  })
  async resetPassword(@Body() body: ResetPasswordDto) {
    this.logger.log('Reset password request');
    const decodedData = await this.cryptoService.verifyResetToken(body.token);
    if (!decodedData) {
      this.logger.warn('Expired reset link');
      throw new BadRequestException('Your password reset link is expired. Please try again.');
    }
    const userId = decodedData.userId;
    const user = await this.userService.findById(userId);
    if (user?.passwordResetData?.token !== body.token) {
      this.logger.warn('Expired reset link');
      throw new BadRequestException('Your password reset link is expired. Please try again.');
    }
    if (!user?.passwordResetData?.expiryTime) {
      this.logger.warn('Expired reset link');
      throw new BadRequestException('Your password reset link is expired. Please try again.');
    }
    if (user.passwordResetData.expiryTime <= new Date()) {
      this.logger.warn('Expired reset link');
      throw new BadRequestException('Your password reset link is expired. Please try again.');
    }
    const hashPassword = await this.cryptoService.hashPassword(body.password);
    await this.userService.update(userId, { password: hashPassword, passwordResetData: null });
    return {
      message: 'Successfully updated user password',
    };
  }

  @Post('/update-password')
  @ApiResponse(validationApiResOptions)
  @ApiOkResponse({
    description: 'Successfully updated user password',
  })
  async updatePassword(@Body() body: UpdatePasswordDto) {
    this.logger.log('Update password request');
    const userId = body.jwtPayload.userId;
    const user = await this.userService.findById(userId, { email: 1, password: 1 });
    if (!user) {
      this.logger.warn('Invalid email');
      throw new BadRequestException('Invalid email');
    }
    const isMatched = await this.cryptoService.validatePassword(body.password, user.password);
    if (!isMatched) {
      this.logger.warn('Invalid password attempt');
      throw new BadRequestException('Invalid password');
    }
    const hashPassword = await this.cryptoService.hashPassword(body.newPassword);

    await this.userService.update(userId, { password: hashPassword });
    return {
      message: 'Successfully updated user password',
    };
  }
}

