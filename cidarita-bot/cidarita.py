from telegram.ext import Updater, InlineQueryHandler, CommandHandler
import requests
import re

TOKEN = '1114108713:AAHcjlsMo0wHUoUDCEPw5iuudrrSA2a0uUo'

def telegramCommand(func):
    name = name = func.__name__
    return CommandHandler(name, func)

def notification(drugs_name, chat_data):
    def message(context):
        job = context.job
        print(chat_data)
        chat_data[drugs_name] = 0
        context.bot.send_message(job.context, text=f"""Tá na hora de tomar o {drugs_name} meu filho!""")
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
        response += f"{drugs_name} - {drugs_list[drugs_name]}h\n"

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
        
        context.chat_data[drugs_name] = 0
        response = f"""
        Você adicionou o remédio {drugs_name}
        """
        context.bot.send_message(chat_id=chat_id, text=response)
    
    except (IndexError, ValueError):
        update.message.reply_text("Voce precisa dizer o nome do remédio: /add <nome-do-remedio>")

@telegramCommand
def notify(update, context):
    user_text = update.message.text
    chat_id = update.message.chat_id

    try:
        drugs_name = context.args[0]
        notification_time = int(context.args[1])

        if notification_time < 0:
            update.message.reply_text(f"""Não posso mudar o passado, desculpa.""")
            return


        if drugs_name not in context.chat_data:
            update.message.reply_text(f"""O remédio {drugs_name} ainda não foi adicionado a sua lista, para adicionar digite: /add {drugs_name}""")
            return
        
        context.chat_data[drugs_name] = notification_time
        context.job_queue.run_once(notification(drugs_name, context.chat_data), notification_time * 3600, context=chat_id)

        response = f"""
        Vou avisar quando tomar o {drugs_name} daqui há {notification_time} horas
        """
        update.message.reply_text(response)
    
    except (IndexError, ValueError):
        update.message.reply_text("Voce precisa dizer o nome do remédio: /add <nome-do-remedio>")

@telegramCommand
def start(update, context):
    name = update.message.chat.first_name

    init_message = f"""
    Olá, {name}!
    Eu sou a CidaRita Bot e farei o papel de mãe te lembrando quando tomar seu remedinho novamente.
                                            
        Vê se fica bom logo hein :)
    
    Digite: /add <nome-do-remedio> para adicionar um remédio
    Digite: /notify <nome-do-remedio> <tempo-em-horas> para agendar uma notificação
    Digite: /drugs para saber sua lista de remédios e quanto tempo falta para a notificação
    """
    context.bot.send_message(chat_id=update.effective_chat.id, text=init_message)

def main():
    updater = Updater(token=TOKEN, use_context=True)
    dispatcher = updater.dispatcher
    dispatcher.add_handler(start)
    dispatcher.add_handler(add)
    dispatcher.add_handler(drugs)
    dispatcher.add_handler(notify)
    updater.start_polling()
    updater.idle()

if __name__ == '__main__':
    main()