# Generated by Django 5.1.5 on 2025-01-27 12:32

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0003_subcategory'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='product',
            options={'verbose_name': 'Categoria', 'verbose_name_plural': 'Categorie'},
        ),
        migrations.AddField(
            model_name='category',
            name='parent',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='subcategories', to='menu.category'),
        ),
        migrations.DeleteModel(
            name='Subcategory',
        ),
    ]
