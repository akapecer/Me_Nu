# Generated by Django 5.1.5 on 2025-01-27 14:54

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0009_remove_category_available_from_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='product',
            name='category',
            field=models.ForeignKey(limit_choices_to={'parent__isnull': False}, on_delete=django.db.models.deletion.CASCADE, related_name='products', to='menu.category'),
        ),
    ]
