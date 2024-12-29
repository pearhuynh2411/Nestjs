import { Module } from "@nestjs/common";
import { CloudinaryService } from "./cloudinary.service";
import { CloudinaryConfig } from "./cloudinary.config";
@Module({
    providers:[CloudinaryConfig, CloudinaryService],
    exports: [CloudinaryService]
})
export class CloudinaryModule {}