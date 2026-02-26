---
title: "Clean Architecture en TypeScript: Cómo estructuro mis proyectos"
date: "2026-02-20"
excerpt: "La Clean Architecture no es solo una teoría. En este artículo te cuento cómo la aplico en proyectos reales con TypeScript, qué problemas resuelve y por qué vale la pena la inversión inicial."
tags: ["typescript", "arquitectura", "clean-code"]
coverImage: ""
---

Llevo años trabajando con TypeScript y he probado muchas formas de organizar un proyecto. Monolitos, microservicios, frameworks opinionados... Al final, lo que más me ha funcionado es la **Clean Architecture** adaptada a JavaScript/TypeScript.

## ¿Por qué Clean Architecture?

La razón principal es simple: **el negocio no debería depender del framework**. Si mañana pasas de Express a Fastify, o de una base de datos SQL a Firestore, tu lógica de negocio no tendría que cambiar ni una línea.

Esto suena a ingeniería teórica hasta que lo necesitas de verdad. Y créeme, lo necesitarás.

## Las capas

Organizo el código en cuatro capas concéntricas:

1. **Domain**: entidades, value objects, interfaces de repositorios
2. **Application**: casos de uso (lo que el sistema puede hacer)
3. **Infrastructure**: implementaciones concretas (base de datos, APIs externas)
4. **Presentation**: controllers HTTP, handlers de eventos, CLI

### La regla de dependencia

La regla fundamental es que **las dependencias siempre apuntan hacia adentro**. El dominio no sabe nada de Express. Los casos de uso no saben nada de MongoDB. Cada capa solo conoce la siguiente hacia dentro.

```typescript
// ❌ Malo — el dominio depende de Mongoose
import { Schema } from 'mongoose'

class User {
  schema = new Schema({ name: String })
}

// ✅ Bueno — el dominio es puro TypeScript
class User {
  constructor(
    public readonly id: UserId,
    public readonly email: Email,
    public readonly name: UserName
  ) {}
}
```

## Estructura de carpetas que uso

```
src/
├── domain/
│   ├── user/
│   │   ├── User.ts           # Entidad
│   │   ├── UserId.ts         # Value Object
│   │   └── UserRepository.ts # Interface
├── application/
│   └── user/
│       └── CreateUser/
│           ├── CreateUserUseCase.ts
│           └── CreateUserDTO.ts
├── infrastructure/
│   └── persistence/
│       └── FirestoreUserRepository.ts
└── presentation/
    └── http/
        └── UserController.ts
```

## ¿Vale la pena el overhead inicial?

Sí, pero con matices. Para un proyecto pequeño o un prototipo rápido, es overkill. Pero para cualquier proyecto que vaya a mantenerse más de 6 meses y que trabaje más de una persona... es inversión, no gasto.

La clave está en entender que Clean Architecture no es un conjunto de carpetas. Es un conjunto de **decisiones sobre dependencias**.

## Conclusión

No copies mi estructura de carpetas. Entiende la regla de dependencia, aplícala con criterio y adapta el resto a tu contexto. Eso es lo que me ha funcionado.

Si quieres profundizar, tengo un curso completo sobre esto en [aprendiendo.dev](https://aprendiendo.dev).
