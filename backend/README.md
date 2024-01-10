## Requirements
 - Django 4.2.7
 - python 3.11

## Installation

1. Make sure `poetry` dependency manager is installed on your machine:

    ```shell
    poetry --version
    ```

    Otherwise, install it with the following command:

    Linux, macOS, Windows (WSL)

    ```shell
    curl -sSL https://install.python-poetry.org | python3 -
    ```

    `python3 -`, `python -` or `py -` command depends on your OS and Python installation.

    Windows (Powershell)

    ```shell
    (Invoke-WebRequest -Uri https://install.python-poetry.org -UseBasicParsing).Content | py -
    ```

    For more information about `poetry` installation refer to its [Docs](https://python-poetry.org/docs/).

2. Add Poetry to your PATH. You can find instructions for your OS in the [Poetry Docs](https://python-poetry.org/docs/#installation).

3. Clone project and move to its directory

    ```shell
    git clone git@github.com:Tahir-itechart/VentionLab.git .
    ```

    ```shell
    cd backend
    ```

4. Activate `poetry` shell and install the project dependencies from `dev` (for development) or `prod` (for production) group:

    ```shell
    poetry shell
    ```

    ```shell
    poetry install --only <group name> --no-root
    ```

    To deactivate `poetry` shell just enter command `exit`.

    Install new dependency with `poetry`:

    ```shell
    poetry add <dependency name> -G <group name>
    ```

    Uninstall dependency with `poetry`:

    ```shell
    poetry remove <dependency name> -G <group name>
    ```

## Testing and coverage code locally
Run test by coverage
```shell
coverage run -m pytest
```  

Create coverage report
```shell
pytest --cov  
```
or 
```shell
coverage report -m 
```
Create html coverage report 
```shell
coverage html
```
