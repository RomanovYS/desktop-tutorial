from django.db import models


class ProductCategory(models.Model):
    name = models.CharField(verbose_name='имя', max_length=64, unique=True)
    description = models.TextField(verbose_name='описание', blank=True)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or 'Категория продуктов с ID - {self.pk}'

    class Meta:
        verbose_name = 'категория'
        verbose_name_plural = 'категории'


class Product(models.Model):
    category = models.ForeignKey(ProductCategory, verbose_name='категория', on_delete=models.CASCADE)
    name = models.CharField(verbose_name='название товара', max_length=80, unique=False)
    description = models.TextField(verbose_name='описание товара', max_length=200, blank=True)
    short_desc = models.TextField(verbose_name='краткое описание товара', max_length=100, blank=True)
    image = models.ImageField(verbose_name='фото', upload_to='product_images', blank=True)
    price = models.DecimalField(verbose_name='цена', max_digits=8, decimal_places=2, default=0)
    quantity = models.PositiveIntegerField(verbose_name='кол-во на складе', default=0)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name or 'Товар с ID - {self.pk}'

    class Meta:
        verbose_name = 'товар'
        verbose_name_plural = 'товары'

