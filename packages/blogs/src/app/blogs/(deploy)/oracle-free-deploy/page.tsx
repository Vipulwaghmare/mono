import CodeBlock from "@/components/code-block";
import { MainWrapper } from "@/components/typography";

function OrcleFreeDeploy() {
  return (
    <MainWrapper title="Deploy node apps freely on oracle cloud">
      <div>
        Hey there, today we will learn how to deploy on oracle. But why oracle,
        because it provides 2 free servers. You can still use this to deploy on
        other services like AWS, Azure, etc. We will directly jump into the
        steps. But before that, first create an oracle account. Do all necessary
        steps. Once your account is created we will start.
      </div>
      <div>
        <h4>Create a free server</h4>
        <p>
          In Oracle its called compute instance. In AWS, EC2. In GCP, compute
          engine. In Azure, virtual machine. In Digital Ocean, droplets.
        </p>
        <p>
          {`In oracle, you get two instance for free. Low CPU & Low RAM obviously. Search <b>instances</b>. Go into service -> instances. Click on <b>Create Instance</b>.`}{" "}
        </p>
        <p>1. Basic Information </p>
        I'll go over only important fields you need right now. Others you can
        look into and fill accordingly. <br />
        Name: Give a name, you can see this name in the list of your instances.{" "}
        <br />
        Image: The OS you want, there are Oracle Linux, Ubuntu, Red Hat, CentOS,
        Windows and AlmaLinux. I'll keep Oracle Linux. <br />
        Shape: The machine you need, keep it the Always free one.
        <p>2. Security </p>
        Keep same
        <p>3. Networking</p>
        This is probably your first time, so you will not have existing virtual
        cloud network. So create a new virtual cloud network. Here in networking
        section you can create one directly. So fill in the details. Make sure
        you know VPC Name, Subnet Name & VNIC name.
        <p>
          Generate a ssh key. Upload public key in Add SSH keys section. Keep
          the private key in a location you can easily visit.
        </p>
        <p>4. Storage</p>
        You can skip
        <p>Review and Create</p>
      </div>
      <div>
        <h4>Add Inbound rule 22 for ssh</h4>
      </div>
      <div>
        <h4>SSH Into EC2 instance</h4>
        ssh -i .ssh/id_private opc@22.222.222.222 ssh -i your-key.pem
        opc@your-public-ip
      </div>
      <div>
        <h4>Increase RAM with swapfile</h4>
        <CodeBlock>{`# 1. Create 4GB swap file (this will take longer than 1GB)
sudo dd if=/dev/zero of=/swapfile bs=1M count=4096
# Takes some time, so don't panic.

# 2. Set correct permissions
sudo chmod 600 /swapfile

# 3. Make it a swap file
sudo mkswap /swapfile

# 4. Enable the swap file
sudo swapon /swapfile

# 5. Make it permanent (survives reboots)
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab

# 6. Verify the new 4GB swap is active
free -h`}</CodeBlock>
        Remove swapfile
        <CodeBlock>{`# 1. Turn off current swap
sudo swapoff /swapfile

# 2. Remove from fstab (so it doesn't auto-mount on reboot)
sudo sed -i '/\/swapfile/d' /etc/fstab

# 3. Delete the old swap file
sudo rm /swapfile

# 4. Verify swap is gone
free -h`}</CodeBlock>
        <CodeBlock>{`# Check storage
df -h .
free -h 
watch free -h`}</CodeBlock>
      </div>
      <div>Install dependencies git & node & pm2</div>
      sudo yum update && sudo yum install git <br />
      Go have some coffee or something
      <p>Install docker</p>
      <CodeBlock>{`sudo yum install -y yum-utils zip unzip
sudo yum-config-manager --add-repo=https://download.docker.com/linux/centos/docker-ce.repo
sudo yum install -y docker-ce docker-ce-cli containerd.io
sudo systemctl enable --now docker
`}</CodeBlock>
      <div>Git clone</div>
    </MainWrapper>
  );
}

export default OrcleFreeDeploy;
