# Generated by Django 5.1.6 on 2025-04-19 13:51

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('societyapp', '0004_itemcategory'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Donation',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.EmailField(max_length=254)),
                ('amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('payment_method', models.CharField(choices=[('mpesa', 'M-Pesa'), ('paypal', 'PayPal'), ('visa', 'Visa / MasterCard'), ('bank', 'Bank Transfer')], max_length=20)),
                ('transaction_id', models.CharField(blank=True, max_length=100)),
                ('status', models.CharField(default='pending', max_length=20)),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('message', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Order',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('email', models.EmailField(max_length=254)),
                ('phone', models.CharField(max_length=20)),
                ('planting_location', models.TextField()),
                ('items_json', models.TextField()),
                ('special_instructions', models.TextField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('status', models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('completed', 'Completed')], default='pending', max_length=20)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='ItemCategory',
        ),
        migrations.DeleteModel(
            name='TreeOrder',
        ),
        migrations.RemoveField(
            model_name='product',
            name='price',
        ),
    ]
