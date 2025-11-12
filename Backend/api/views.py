from rest_framework import viewsets
from .models import Domain, Question, Answer
from .serializers import DomainSerializer, QuestionSerializer, AnswerSerializer

class DomainViewSet(viewsets.ModelViewSet):
    queryset = Domain.objects.all()
    serializer_class = DomainSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()  
    serializer_class = QuestionSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        domain_id = self.request.query_params.get('domain')
        if domain_id:
            queryset = queryset.filter(domain_id=domain_id)
        return queryset


class AnswerViewSet(viewsets.ModelViewSet):
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer