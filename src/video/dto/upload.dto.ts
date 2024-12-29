import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


//Dto upload 1 hình ảnh
export class FileUploadDto {
    @ApiProperty({type: 'string', format:'binary'})
    hinhAnh: any;
}

//Dto upload nhiều hình ảnh

export class FilesUploadDto {
    @ApiProperty({type: 'array', items: {type: 'string', format: 'binary'}})
    hinhAnhs : any[];s
}
