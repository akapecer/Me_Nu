from django.contrib import admin
from .models import Category, Product
from django.templatetags.static import static

class ProductAdmin(admin.ModelAdmin):
    fieldsets = (
        (None, {
            'fields': ('category', 'name', 'description', 'price', 'is_available')
        }),
    )
    list_display = ('name', 'category', 'price', 'is_available')
    search_fields = ('name', 'category__name')
    list_filter = ('category', 'is_available')

    class Media:
        css = {
            'all': [static('menu/css/admin.css')]  # Carica il CSS personalizzato
        }

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_active')
    list_filter = ('is_active',)

# Registra i modelli nell'admin
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
