# Generated by Django 5.1.5 on 2025-01-27 14:18

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('menu', '0007_category_parent_product_subcategory'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='subcategory',
        ),
    ]
