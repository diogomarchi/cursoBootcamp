import { startOfHour } from 'date-fns';
import Agendamento from '../models/Agendamento';
import AgendamentoRepository from '../repositories/AgendamentosRepository';

interface RequestDTO {
  provider: string;
  date: Date;
}

class CreateAgendamentoService {
  private agendamentosRepository: AgendamentoRepository;

  constructor(agendamentosRepository: AgendamentoRepository) {
    this.agendamentosRepository = agendamentosRepository;
  }

  public execute({ date, provider }: RequestDTO): Agendamento {
    const agendamentoDate = startOfHour(date);

    // eslint-disable-next-line max-len
    const findAgendamentoInSameDate = this.agendamentosRepository.findByDate(agendamentoDate);

    if (findAgendamentoInSameDate) {
      throw Error('This agendamento is already booked');
    }

    const agendamento = this.agendamentosRepository.create({
      provider,
      date: agendamentoDate,
    });

    return agendamento;
  }
}

export default CreateAgendamentoService;
