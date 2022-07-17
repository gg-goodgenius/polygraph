# POLYGRAPH

Программный аналитический модуль. В модуль загружается массив данных от различных датчиков, собранный в ходе исследования. На основе анализа полученных данных с помощью моделей происходит классификация состояния испытуемого. Классифицированные данные агрегируются в базе данных модуля. Доступ к информации осуществляется через веб-интерфейс. Присутствует возможность просмотра полученных в результате анализа промежуточных метрик представленных по выбранным оператором параметрам. Результат анализа предоставляется оператору в наглядной форме в виде таблицы, диаграмм (по каждому из выбранных параметров) Стек решения: Python: Pytorch, CatBoost, HeartPy

Уникальность: анализ данных происходит путём комбинированного применения нескольких подходов (нейросетевых моделей и сгенерированных признаков).На основе полученных данных происходит определение уровня стресса пользователя. Благодаря гибридному подходу повышается уровень интерпретируемости модели.

# Установка
## Клонирование репозитория
```
git clone https://github.com/gg-goodgenius/polygraph
cd polygraph
```
## Запуск backend
```
cd service
python -m venv .venv
source .venv/bin/activate
pip install -r req.txt
python manage.py migrate
python manage.py runserver 
```
API будет доступен по адресу http://127.0.0.1:8000/api/

## Запуск frontend
```
cd front
yarn
yarn start
```
Сервис будет доступен по адресу http://127.0.0.1:3000/
