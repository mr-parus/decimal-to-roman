import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MathController } from './controllers/math.controller';
import { TasksController } from './controllers/tasks.controller';
import { SseService } from './services/sse.service';

@Module({
  providers: [SseService],
  controllers: [MathController, TasksController],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: 'public',
      exclude: [`/api*`],
    }),
  ],
})
export class MathModule {}
