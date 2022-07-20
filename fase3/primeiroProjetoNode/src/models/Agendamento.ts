import { uuid } from 'uuidv4';

class Agendamento {
  id: string;

  provider: string;

  date: Date;

  constructor({ provider, date }: Omit<Agendamento, 'id'>) {
    this.id = uuid();
    this.provider = provider;
    this.date = date;
  }
}

export default Agendamento;
