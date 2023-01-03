FROM python:3.8

WORKDIR /app

RUN apt update
RUN apt-get install -y git

ENV model applient-model

CMD git clone https://github.com/adnansherif1/upskill-backend.git /app && pip install -r requirements.txt \    
    && rm -rf /root/.cache && flask run --host 0.0.0.0
    
