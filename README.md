# ENDPOINST

v1

## Cidades (PRIVADO)

    - GET       /cidades        Buscar uma lista de cidades, com paginação e filro por nome
    - POST      /cidades        Criar uma nova cidade
    - GET       /cidades/:id    Buscar apenas uma cidade pelo seu id
    - PUT       /cidades/:id    Atualizar uma cidade pelo seu id
    - DELETE    /cidades/:id    Apagar uma cidade pelo seu id

## Pessoas (PRIVADO)

    - GET       /pessoas        Buscar uma lista de pessoas, com paginação e filro por nome
    - POST      /pessoas        Criar uma nova pessoas
    - GET       /pessoas/:id    Buscar apenas uma pessoas pelo seu id
    - PUT       /pessoas/:id    Atualizar uma pessoas pelo seu id
    - DELETE    /pessoas/:id    Apagar uma pessoas pelo seu id

## Login (PUBLICO)

    - POST      /entrar         Permite um usuário existente no sistema gerar um token para acessar os endpoints privados
    - POST      /cadastrar      Permite criar um novo usuario

---

# ENTIDADES

## Usuario

    - id        (pk, number, required, auto increment)
    - nome      (string, required, min(3))
    - email     (string, unique, required, min(5))
    - senha     (string, required, min(6))

## Cidades

    - id        (pk, number, required, auto increment)
    - nome      (string, required, max(150), index)   - index numa field string acelera o processo de consulta no sql

## Pessoa

    - id        (pk, number, required, auto increment)
    - nome      (string, index, required)
    - emial     (string, unique, required)
    - cidadeId    (fk, number, required)
