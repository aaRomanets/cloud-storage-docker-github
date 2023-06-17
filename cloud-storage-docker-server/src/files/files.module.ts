import { Module } from '@nestjs/common';
import { MongooseModule } from "@nestjs/mongoose";

import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import {File, FileSchema} from "./entities/file.schema";

@Module({
  controllers: [FilesController],
  providers: [FilesService],
  imports: [MongooseModule.forFeature([
    {name: File.name, schema: FileSchema}
  ])],
})
export class FilesModule {}
