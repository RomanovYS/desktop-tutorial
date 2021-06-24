from django.shortcuts import render


def products(reqest):
    return render(reqest, 'mainapp/products.html')
