from django.shortcuts import render



def index(request):
    return render(request, 'posture_app/index.html')
