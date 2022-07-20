import { isEqual } from 'date-fns';
import Agendamento from '../models/Agendamento';

// DTO = Data Transfer Object
interface CreateAgendamentoDTO {
  provider: string;
  date: Date;
}

class AgendamentosRepository {
  private agendamentos: Agendamento[];

  constructor() {
    this.agendamentos = [];
  }

  public all(): Agendamento[] {
    return this.agendamentos;
  }

  public findByDate(date: Date): Agendamento | null {
    // eslint-disable-next-line max-len
    const findAgendamento = this.agendamentos.find((agendamento) => isEqual(date, agendamento.date));
    return findAgendamento || null;
  }

  public create({ provider, date }: CreateAgendamentoDTO): Agendamento {
    const agendamento = new Agendamento({ provider, date });

    this.agendamentos.push(agendamento);

    return agendamento;
  }
}

export default AgendamentosRepository;
