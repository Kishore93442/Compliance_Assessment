from django.db import models

class Domain(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    total_questions = models.IntegerField(default=0)

    def __str__(self):
        return self.name

class Question(models.Model):
    domain = models.ForeignKey(Domain, related_name='questions', on_delete=models.CASCADE)
    question_text = models.TextField()

    def __str__(self):
        return f"{self.domain.name} - {self.question_text[:50]}"
    
class Answer(models.Model):
    question = models.ForeignKey('Question', on_delete=models.CASCADE)
    answer = models.CharField(max_length=10, choices=[('Yes', 'Yes'), ('No', 'No')])
    comment = models.TextField(blank=True, null=True)
    file = models.FileField(upload_to='uploads/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.question.domain.name} - {self.question.question_text[:30]} ({self.answer})"

