import os


emissoras = os.listdir(os.getcwd())
emissoras.remove("renomear_emissoras.py")

for index, emissora in enumerate(emissoras):

    try:
        name = emissora.split("_")
        for indexPalavra, palavra in enumerate(name):
            name[indexPalavra] = palavra.capitalize()

        name = "".join(name)

        os.rename(emissora, name)
    except:
        pass

    nome_emissora = emissora.split(".")[0]
    print(
        f"import {nome_emissora}Icon from '../assets/emissoras/{emissoras[index]}'")
