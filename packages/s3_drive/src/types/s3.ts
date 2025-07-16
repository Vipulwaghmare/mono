export interface S3Credentials {
  accessKeyId: string
  secretAccessKey: string
  region: string
  sessionToken?: string
}

export interface S3Object {
  Key: string
  LastModified: Date
  Size: number
  StorageClass: string
}

export interface S3Bucket {
  Name: string
  CreationDate: Date
}
