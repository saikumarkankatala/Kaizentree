# Generated by Django 4.2.10 on 2024-02-12 04:54

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("items", "0003_alter_category_user"),
    ]

    operations = [
        migrations.RemoveField(model_name="category", name="user",),
    ]
