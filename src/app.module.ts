import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DoggosModule } from './doggos/doggos.module';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { ConfigModule } from '@nestjs/config';
import { KennelsModule } from './kennels/kennels.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DoggosModule,
    KennelsModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    KennelsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
