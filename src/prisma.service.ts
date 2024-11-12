import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  handlePrismaError(error: Prisma.PrismaClientKnownRequestError) {
    let message;
    switch (error.code) {
      case 'P2000': message = `Указанное значение для столбца слишком длинное для типа столбца. Столбец: ${error?.meta?.target[0]}`;
                    break;
      case 'P2001': message = `Запись, которую искали в условии where ${error?.meta?.target[0]}, не существует}`;
        break;
      case 'P2002': message = `Ошибка с уникальным ограничением для ${error?.meta?.target[0]}`;
        break;
      case 'P2003': message = `Ошибка ограничения внешнего ключа в поле: ${error?.meta?.target[0]}`;
        break;
      case 'P2004': message = `Сбой ограничения в базе данных`;
        break;
      case 'P2005': message = `Значение ${error?.meta?.target[0]}, сохранённое в базе данных для поля ${error?.meta?.target[1]}, не соответствует типу поля`;
        break;
      case 'P2006': message = `Указанное значение ${error?.meta?.target[0]} для {model_name} поля ${error?.meta?.target[1]} недопустимо`;
        break;
      case 'P2007': message = `Ошибка проверки данных`;
        break;
      case 'P2008': message = `Не удалось проанализировать запрос`;
        break;
      case 'P2009': message = `Не удалось подтвердить запрос`;
        break;
      case 'P2010': message = `Неудачный запрос. Код: ${error.code}`;
        break;
      case 'P2011': message = `Нарушение нулевого ограничения`;
        break;
      case 'P2012': message = `Отсутствует требуемое значение в ${error?.meta?.target[0]}`;
        break;
      case 'P2013': message = `Отсутствует обязательный аргумент ${error?.meta?.target[0]} для поля ${error?.meta?.target[1]}.`;
        break;
      case 'P2014': message = `Изменение, которое вы пытаетесь внести, нарушит требуемое соотношение между моделями`;
        break;
      case 'P2015': message = `Не удалось найти связанную запись.`;
        break;
      case 'P2016': message = `Ошибка интерпретации запроса.`;
        break;
      case 'P2017': message = `Записи для связи ${error?.meta?.target[0]} между моделями ${error?.meta?.target[1]} и ${error?.meta?.target[2]} не связаны`;
        break;
      case 'P2018': message = `Необходимые подключенные записи не найдены.`;
        break;
      case 'P2019': message = `Ошибка ввода.`;
        break;
      case 'P2020': message = `Значение выходит за пределы допустимого для типа.`;
        break;
      case 'P2021': message = `Таблица ${error?.meta?.target[0]} не существует в текущей базе данных.`;
        break;
      case 'P2022': message = `Столбец ${error?.meta?.target[0]} не существует в текущей базе данных.`;
        break;
      case 'P2023': message = `Несогласованные данные столбца.`;
        break;
      case 'P2024': message = `Истекло время ожидания при получении нового подключения из пула подключений.`;
        break;
      case 'P2025': message = `Операция не удалась, так как она зависит от одной или нескольких записей, которые были необходимы, но не найдены.`;
        break;
      case 'P2026': message = `Текущий поставщик базы данных не поддерживает функцию, которую использовал запрос.`;
        break;
      case 'P2027': message = `Во время выполнения запроса в базе данных возникло несколько ошибок.`;
        break;
      case 'P2028': message = `Ошибка API транзакций.`;
        break;
      case 'P2029': message = `Ошибка превышения предела параметров запроса.`;
        break;
      case 'P2030': message = `Не удалось найти полнотекстовый индекс для поиска. Попробуйте добавить @@fulltext([Поля...]) в вашу схему.`;
        break;
      case 'P2031': message = `Для Prisma необходимо выполнять транзакции, для чего сервер MongoDB должен работать как набор реплик.`;
        break;
      case 'P2033': message = `Число, используемое в запросе, не помещается в 64-разрядное целое число со знаком. Рассмотрите возможность использования BigInt в качестве типа поля, если вы пытаетесь хранить большие целые числа.`;
        break;
      case 'P2034': message = `Транзакция не удалась из-за конфликта при записи или тупиковой ситуации. Пожалуйста, повторите транзакцию.`;
        break;
      case 'P2035': message = `Нарушение утверждения в базе данных.`;
        break;
      case 'P2036': message = `Ошибка во внешнем соединителе (id {id}).`;
        break;
      case 'P2037': message = `Открыто слишком много подключений к базе данных.`;
        break;
      default: message = 'Неизвестная ошибка в Prisma';
    }
    return message;
  }
}
