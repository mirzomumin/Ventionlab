## Vention Education Platform

An educational platform aimed at improving the learning process and interaction between interns and mentors in vention
Main tasks to be solved by the platform

- [ ] **_Easy access to courses_**
- [ ] **_Separation of courses by technology_**
- [ ] **_Opportunities to improve the work in the platform for teachers_**
- [ ] **_Interactive lessons_**
- [ ] **_Getting feedback wherever possible_**
- [ ] **_Adding new features in education_**

## Launch project with Docker

Move to project directory (as shown in third step of installation) and run it with docker:

```shell
docker compose up --build -d
```

To stop containers enter command:

```shell
docker compose down
```

## Extra commands

- To migrate database:

    ```shell
    make migrate
    ```

- To run frontend side dev

    ```shell
    docker-compose --profile frontend up --build
    ```
