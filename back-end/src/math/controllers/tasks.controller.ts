import { Body, Controller, Post, Req, Sse } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';
import { ConvertDecimalToRomanTaskDto } from '../dtos/convertDecimalToRomanTask.dto';
import { SseService } from '../services/sse.service';
import { convertDecimalToRoman } from '../utils/math.util';

@Controller('/api/tasks')
export class TasksController {
  constructor(private readonly sseService: SseService) {}

  @Post()
  createTask(@Body() { decimal, clientId }: ConvertDecimalToRomanTaskDto) {
    this.sseService.sendMessage(clientId, {
      roman: convertDecimalToRoman(decimal),
      decimal,
    });

    return {
      result: {
        taskId: uuidV4(),
      },
    };
  }

  @Sse()
  taskResults(@Req() req: Request): Observable<MessageEvent> {
    const { clientId, observable } = this.sseService.connect();

    req.once('close', () => {
      this.sseService.disconnect(clientId);
    });

    return observable;
  }
}
