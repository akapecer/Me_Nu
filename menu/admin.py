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

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "category":
            # Filtra le categorie per mostrare solo le sottocategorie (quelle con un parent)
            kwargs["queryset"] = Category.objects.filter(parent__isnull=False)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'parent', 'is_active', 'is_parent_display')
    list_filter = ('is_active', 'parent')
    search_fields = ('name', 'parent__name')

    def is_parent_display(self, obj):
        return obj.is_parent
    is_parent_display.short_description = 'Is Parent'
    is_parent_display.boolean = True
    
# Registra i modelli nell'admin
admin.site.register(Product, ProductAdmin)
admin.site.register(Category, CategoryAdmin)
