datas=[{
        "section": "C",
        "division": "20",
        "groupe": "20.4",
        "classe": "20.4",
        "Libellés NAA rev1": "Fabrication de savons, de produits d'entretien et de parfums",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_groupe": "Fabrication de savons, de produits d'entretien et de parfums"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.4",
        "classe": "20.41",
        "Libellés NAA rev1": "Fabrication de savons, détergents et produits d'entretien",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication de savons, détergents et produits d'entretien"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.4",
        "classe": "20.42",
        "Libellés NAA rev1": "Fabrication de parfums et de produits pour la toilette",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication de parfums et de produits pour la toilette"
    },   {
        "section": "C",
        "division": "20",
        "groupe": "20.5",
        "classe": "20.5",
        "Libellés NAA rev1": "Fabrication d'autres produits chimiques",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_groupe": "Fabrication d'autres produits chimiques"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.5",
        "classe": "20.51",
        "Libellés NAA rev1": "Fabrication de produits explosifs",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication de produits explosifs"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.5",
        "classe": "20.52",
        "Libellés NAA rev1": "Fabrication de colles",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication de colles"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.5",
        "classe": "20.53",
        "Libellés NAA rev1": "Fabrication d'huiles essentielles",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication d'huiles essentielles"
    },
    {
        "section": "C",
        "division": "20",
        "groupe": "20.5",
        "classe": "20.59",
        "Libellés NAA rev1": "Fabrication d'autres produits chimiques n.c.a.",
        "code_nsa": 9,
        "libelles_nsa": "CHIMIE CAOUTCHOUC PLASTIQUES",
        "libelles_classe": "Fabrication d'autres produits chimiques n.c.a."
    },]
import json


tables={}
tb=[]
t=[]
g=[]
tableGroupe=[]
tableClasse=[]
for data in datas:
    k=data.keys()
    #print(k)
    print("libelles_classe" in k)
    if  "libelles_classe" in k :
        
        if data["division"]==data["groupe"][0:2]:
            tables["section"]=data["section"]
            
            # if "libelles_division"in k:
            #      tables["division"]=data["division"]
            #      tables["libelles_division"]=data["libelles_division"]
            # # tableGroupe.append(data["groupe"])
            
            if data["groupe"]==data["classe"][0:4]:
            
                 tableClasse.append({"classe":data["classe"]})
                 tableGroupe.append({"groupe":data["groupe"],"classes":tableClasse})

            #     #print('------',tableClasse)
            #     #print("2"*20)
            #     #print("classssssssesss=>",tableClasse)
            #     # if "libelles_classe" in data:
            #     #     print("libelles_classe" in data)
            #     #     tableClasse.append(data["libelles_classe"])
            #         # tableClasse["libelles_classe"]=data["libelles_classe"]

            #     if "libelles_groupe" in k:
            #         tableGroupe.append({"groupe":data["groupe"],"classes":tableClasse,"libelles_groupe":data["libelles_groupe"]})
            #         #print("ffffffffffff",tableGroupe)
            
        tables["groupes"]=tableGroupe
            
    

        # tb.append(tables)
        # tbs=json.dumps(tables)
        t.append(tables)
        tableGroupe,tables=[],{}
        
    
print(t)        
g=json.dumps(t)

# print(g)
a=open('writed_json1.json', 'w')
a.write(g)
a.close()
    
        # jsonFile.close()
        # tbs.append(tbs)

