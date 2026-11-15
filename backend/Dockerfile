FROM python:3.15-slim

WORKDIR /apps

# Copy requirements dan install package langsung ke dalam image
COPY requirements.txt /apps/
RUN pip install --no-cache-dir -r requirements.txt

# Copy seluruh kode backend
COPY . /apps/