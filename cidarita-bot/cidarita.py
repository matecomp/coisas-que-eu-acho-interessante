from telegram.ext import Updater, InlineQueryHandler, CommandHandler
from datetime import timedelta
import requests
import re

TOKEN = '1114108713:AAHcjlsMo0wHUoUDCEPw5iuudrrSA2a0uUo'

def telegramCommand(func):
    name = name = func.__name__
    return CommandHandler(name, func)

def notification(drugs_name, chat_data):
    def message(context):
        job = context.job
        context.bot.send_message(job.context, text=f"Tá na hora de tomar o {drugs_name} meu filho!\nJá tomou o remédio? /tomei")
    return message

@telegramCommand
def drugs(update, context):
    user_text = update.message.text
    chat_id = update.message.chat_id
    drugs_list = context.chat_data

    if len(drugs_list) == 0:
        update.message.reply_text(f"Você não tem nenhum remédio adicionado.")
        return

    response = ""
    for drugs_name in drugs_list:
        response += f"{drugs_name}: interval - {drugs_list[drugs_name]['interval']}\n"

    update.message.reply_text(response)

@telegramCommand
def add(update, context):
    user_text = update.message.text
    chat_id = update.message.chat_id

    try:
        drugs_name = context.args[0]

        if drugs_name in context.chat_data:
            update.message.reply_text(f"""O remédio {drugs_name} já foi adicionado anteriormente""")
            return
        
        context.chat_data[drugs_name] = {
            'interval': 0
        }
        response = f"""
        Você adicionou o remédio {drugs_name}
        """
        context.bot.send_message(chat_id=chat_id, text=response)
    
    except (IndexError, ValueError):
        update.message.reply_text("Voce precisa dizer o nome do remédio:\n/add <nome-do-remedio>")

@telegramCommand
def remove(update, context):
    user_text = update.message.text
    chat_id = update.message.chat_id

    try:
        drugs_name = context.args[0]

        if drugs_name in context.chat_data:
            context.chat_data.pop(drugs_name, None)
            update.message.reply_text(f"""O remédio {drugs_name} foi removido.""")
            return

        update.message.reply_text(f"O remédio {drugs_name} não existe na sua lista de remédios.")

    except (IndexError, ValueError):
        update.message.reply_text("Voce precisa dizer o nome do remédio:\n/remove <nome-do-remedio>")

@telegramCommand
def notify(update, context):
    user_text = update.message.text
    chat_id = update.message.chat_id

    try:
        drugs_name = context.args[0]
        notification_delay = int(context.args[1])

        if drugs_name not in context.chat_data:
            update.message.reply_text(f"""O remédio {drugs_name} ainda não foi adicionado a sua lista, para adicionar digite: /add {drugs_name}""")
            return
        
        context.chat_data[drugs_name] = {
            'interval': notification_delay
        }

        response = f"Irei te lembrar de tomar o {drugs_name} daqui há {notification_delay} {"hora" if notification_delay < 2 else "horas"}"
        update.message.reply_text(response)


        context.job_queue.run_repeating(notification(drugs_name, context.chat_data), interval=3, first=notification_delay, context=chat_id)
    
    except (IndexError, ValueError):
        update.message.reply_text("Voce precisa dizer o nome do remédio e o intervalo de tempo em horas:\n /notify <nome-do-remedio> <intervalo-em-horas>")

@telegramCommand
def tomei(update, context):
    context.job_queue.stop()
    update.message.reply_text("Fique bom logo <3")

@telegramCommand
def start(update, context):
    name = update.message.chat.first_name

    init_message = f"""
    Olá, {name}!
    Eu sou a CidaRita Bot e farei o papel de mãe te lembrando quando tomar seu remedinho novamente.
                                            
        Vê se fica bom logo hein :)
    
    Digite: /add <nome-do-remedio> para adicionar um remédio
    Digite: /remove <nome-do-remedio> para remover um remédio
    Digite: /notify <nome-do-remedio> <intervalo-em-horas> para notificar após o intervalo de horas
    Digite: /drugs para saber sua lista de remédios e quanto tempo falta para a notificação
    """
    context.bot.send_message(chat_id=update.effective_chat.id, text=init_message)

def main():
    updater = Updater(token=TOKEN, use_context=True)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(start)
    dispatcher.add_handler(add)
    dispatcher.add_handler(remove)
    dispatcher.add_handler(drugs)
    dispatcher.add_handler(notify)
    dispatcher.add_handler(tomei)
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()