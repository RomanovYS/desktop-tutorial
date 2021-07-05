from django.shortcuts import render
from mainapp.models import ProductCategory


def products(request):
    title = 'продукты/каталог'
    prod_link = ProductCategory.objects.all()
    context = {
        'title': title,
        'prod_cat': prod_link,
    }
    return render(request=request, template_name='mainapp/products.html', context=context)
