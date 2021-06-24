from django.shortcuts import render


def index(reqest):
    return render(reqest, 'index.html')


def contacts(reqest):
    return render(reqest, 'contact.html')

