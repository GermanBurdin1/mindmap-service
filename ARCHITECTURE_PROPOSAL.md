# Архитектура расширения системы конструкторов

## Общая концепция

Система будет поддерживать 4 типа конструкторов:
1. **Mindmap** (уже существует) - для визуализации связей и структуры
2. **Drill-grid** - карточки-матрицы для грамматики и словоупотребления
3. **Pattern-cards** - шаблоны фраз для разговорной автоматизации
4. **Flowchart** - алгоритмические схемы для выбора форм, времен, модальности

## Структура базы данных

### 1. Общая таблица `constructors` (базовая информация)

```sql
CREATE TABLE constructors (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR NOT NULL,
  type VARCHAR NOT NULL CHECK (type IN ('mindmap', 'drill_grid', 'pattern_card', 'flowchart')),
  userId UUID NOT NULL,
  courseId INTEGER NULL,
  description TEXT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Назначение**: Хранит общую информацию о всех конструкторах независимо от типа.

### 2. Таблица `drill_grids` (карточки-матрицы)

```sql
CREATE TABLE drill_grids (
  id UUID PRIMARY KEY REFERENCES constructors(id) ON DELETE CASCADE,
  rows JSONB NOT NULL, -- Массив строк матрицы
  columns JSONB NOT NULL, -- Массив колонок матрицы
  cells JSONB NOT NULL, -- Двумерный массив ячеек: {rowIndex, colIndex, content, correctAnswer, hints}
  settings JSONB NULL -- Настройки: {showAnswers, randomize, timeLimit}
);
```

**Структура данных**:
- `rows`: `[{id, label, examples}]` - строки матрицы (например, времена)
- `columns`: `[{id, label, examples}]` - колонки матрицы (например, лица)
- `cells`: `[{rowId, colId, content, correctAnswer, hints, difficulty}]` - ячейки с контентом
- `settings`: настройки отображения и режима тренировки

**Пример использования**: 
- Строки: Present, Past, Future
- Колонки: I, You, He/She, We, They
- Ячейки: формы глаголов

### 3. Таблица `pattern_cards` (шаблоны фраз)

```sql
CREATE TABLE pattern_cards (
  id UUID PRIMARY KEY REFERENCES constructors(id) ON DELETE CASCADE,
  pattern TEXT NOT NULL, -- Шаблон фразы с плейсхолдерами
  example TEXT NOT NULL, -- Пример заполненной фразы
  blanks JSONB NOT NULL, -- Массив "дырок": [{position, correctAnswer, hints, alternatives}]
  variations JSONB NULL, -- Вариации шаблона
  difficulty VARCHAR NULL, -- Уровень сложности
  category VARCHAR NULL -- Категория (вежливость, формальность и т.д.)
);
```

**Структура данных**:
- `pattern`: `"Je voudrais [VERB] [OBJECT]"` - шаблон с плейсхолдерами
- `example`: `"Je voudrais acheter un livre"` - пример заполнения
- `blanks`: `[{id: 1, position: 12, correctAnswer: "acheter", hints: [...], alternatives: [...]}]`
- `variations`: альтернативные формы шаблона
- Этапы: 1) Показать пример, 2) Показать с дырками, 3) Спонтанное заполнение

### 4. Таблица `flowcharts` (алгоритмические схемы)

```sql
CREATE TABLE flowcharts (
  id UUID PRIMARY KEY REFERENCES constructors(id) ON DELETE CASCADE,
  nodes JSONB NOT NULL, -- Узлы схемы: [{id, type, label, question, conditions}]
  edges JSONB NOT NULL, -- Связи: [{from, to, condition, label}]
  startNodeId UUID NOT NULL, -- ID начального узла
  settings JSONB NULL -- Настройки: {showHints, autoAdvance}
);
```

**Структура данных**:
- `nodes`: `[{id, type: 'decision'|'action'|'result', label, question, conditions, result}]`
- `edges`: `[{from, to, condition, label}]` - связи между узлами
- `startNodeId`: ID узла, с которого начинается алгоритм

**Пример использования**:
- Узел "Выбор времени": Present/Past/Future
- Узел "Выбор формы": Affirmative/Negative/Question
- Результат: правильная форма глагола

### 5. Таблица `mindmap` (уже существует, остается без изменений)

```sql
-- Существующая таблица остается как есть
-- Связь с constructors через courseId или через отдельную связь
```

## Структура API

### Общие эндпоинты для всех конструкторов

```
GET    /constructors                    - Список всех конструкторов пользователя
GET    /constructors/:id               - Получить конструктор по ID
POST   /constructors                    - Создать новый конструктор
PUT    /constructors/:id               - Обновить конструктор
DELETE /constructors/:id               - Удалить конструктор
```

### Специфичные эндпоинты

#### Drill-grid
```
GET    /constructors/:id/drill-grid    - Получить данные drill-grid
PUT    /constructors/:id/drill-grid    - Обновить drill-grid
POST   /constructors/:id/drill-grid/validate - Проверить ответы
```

#### Pattern-cards
```
GET    /constructors/:id/pattern-card  - Получить данные pattern-card
PUT    /constructors/:id/pattern-card  - Обновить pattern-card
POST   /constructors/:id/pattern-card/fill - Заполнить шаблон
GET    /constructors/:id/pattern-card/stages/:stage - Получить определенный этап
```

#### Flowchart
```
GET    /constructors/:id/flowchart     - Получить данные flowchart
PUT    /constructors/:id/flowchart      - Обновить flowchart
POST   /constructors/:id/flowchart/traverse - Пройти по алгоритму
GET    /constructors/:id/flowchart/result - Получить результат прохождения
```

## Структура фронтенда

### Компоненты

```
features/
  constructors/
    main/
      main.component.ts              - Главная страница выбора типа конструктора
    mindmap/                         - Существующий компонент (без изменений)
    drill-grid/
      drill-grid.component.ts        - Компонент редактора drill-grid
      drill-grid-viewer.component.ts - Компонент просмотра/тренировки
    pattern-card/
      pattern-card.component.ts      - Компонент редактора pattern-card
      pattern-card-viewer.component.ts - Компонент просмотра/тренировки
    flowchart/
      flowchart.component.ts         - Компонент редактора flowchart
      flowchart-viewer.component.ts  - Компонент просмотра/тренировки
```

### Сервисы

```
services/
  constructor.service.ts              - Общий сервис для всех конструкторов
  drill-grid.service.ts              - Сервис для drill-grid
  pattern-card.service.ts            - Сервис для pattern-card
  flowchart.service.ts               - Сервис для flowchart
```

## Преимущества такой архитектуры

1. **Нормализация БД**: Каждый тип конструктора имеет свою таблицу с оптимизированной структурой
2. **Расширяемость**: Легко добавить новые типы конструкторов
3. **Производительность**: Запросы к конкретному типу конструктора быстрее
4. **Типобезопасность**: Каждый тип имеет свою структуру данных
5. **Гибкость**: Общая таблица `constructors` позволяет работать со всеми типами единообразно

## Миграция существующих данных

1. Создать таблицу `constructors`
2. Мигрировать данные из `mindmap` в `constructors`
3. Создать связи между `mindmap` и `constructors` (или интегрировать)

