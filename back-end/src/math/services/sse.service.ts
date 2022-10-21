import { Observable, ReplaySubject, startWith, Subject } from 'rxjs';
import { v4 as uuidV4 } from 'uuid';

export class SseService {
  private readonly connectionPool: Map<string, Subject<MessageEvent>> =
    new Map();

  connect(): { clientId: string; observable: Observable<MessageEvent> } {
    const clientId = uuidV4();
    const subject = new ReplaySubject<MessageEvent>();
    this.connectionPool.set(clientId, subject);

    const connectionMessage = new MessageEvent('connect', { data: clientId });

    return {
      clientId,
      observable: subject.pipe(startWith(connectionMessage)),
    };
  }

  disconnect(clientId: string): void {
    this.connectionPool.delete(clientId);
  }

  sendMessage(clientId: string, data: Record<string, unknown>): void {
    const connection = this.connectionPool.get(clientId);
    if (!connection) return;

    const message = new MessageEvent('message', { data });

    connection.next(message);
  }
}
