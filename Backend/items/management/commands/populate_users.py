from django.core.management.base import BaseCommand
from django.contrib.auth.models import User

class Command(BaseCommand):
    help = 'Populate User model with initial data'

    def handle(self, *args, **options):
        # Create initial users
        users_data = [
            {'first_name': 'Sai', 'last_name': 'Kumar', 'email': 'sai@gmail.com', 'username': 'sai', 'password': 'password1'},
            {'first_name': 'Mizzou', 'last_name': 'Kankatala', 'email': 'Mizzou@gmail.com', 'username': 'Mizzou', 'password': 'password2'},
            # Add more users as needed
        ]

        for user_data in users_data:
            User.objects.create_user(**user_data)

        self.stdout.write(self.style.SUCCESS('Successfully populated User model with initial data'))