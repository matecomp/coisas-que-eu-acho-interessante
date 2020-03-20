# CidaRita Telegram Bot:

Este projeto consiste numa POC utilizando a API de Bot do Telegram para realizar uma função que toda mãe faz com maestria que é avisar o horário da medicação quando se está doente. Desde quando eu saí de casa, percebi que minha mãe fazia muita mais do que eu acreditava fazer (e olha que já achava que era muita coisa), então para me sentir mais próximo a ela, criei este bot cujo o nome é a junção do nome dela com o da minha sogra.

CIDA - RITA

### Iniciando o projeto

Crie um ambiente python (versão >= 3.0):
```
which python3
mkvirtualenv -p <diretório-python> <nome-da-env>
workon <nome-da-env>
```

Neste projeto eu utilizei o virtualenvwrapper para criar o ambiente python. Para mais informações, [clique aqui](https://virtualenvwrapper.readthedocs.io/en/latest/index.html).

### Instalando o projeto

Instale as depedências listadas no requirements.txt:
```
make setup
```

### Executando o projeto

O projeto executa o arquivo cidarita.py que define as regras do bot e sobe para o telegram através da lib `python-telegram-bot` para mais informações [clique aqui](https://python-telegram-bot.readthedocs.io/en/stable/).
```
make run
```
[![Image from Gyazo](https://i.gyazo.com/928b4910ac85fd1a6da89a949d3a960e.png)](https://gyazo.com/928b4910ac85fd1a6da89a949d3a960e)

### Lista de comandos:

- /add <nome-do-remedio> - cadastra um novo remédio
- /remove <nome-do-remedio> para remover um remédio
- /notify <nome-do-remedio> <tempo-em-horas> - agenda uma notifição para tomar o remédio
- /drugs - lista todos os remédios cadastrados


### Uso:

Cadastre um remédio:

[![Image from Gyazo](https://i.gyazo.com/c871f52d8ee25dd4907b6697336bc240.png)](https://gyazo.com/c871f52d8ee25dd4907b6697336bc240)

Agende uma notificação:

[![Image from Gyazo](https://i.gyazo.com/5bc4dfa95aabcb4d6a2b4cd18774a469.png)](https://gyazo.com/5bc4dfa95aabcb4d6a2b4cd18774a469)

Cida vai falar pra você tomar o remédio algumas vezes sem o seu concentimento :p