import time
import numpy as np
import math
from pso.particula import Particula

''''
    @author : Mario Dorochesi Ollino
    @date   : 09-01-2019

    Clase que contiene la logica de mas alto nivel de PSO

    e537c28ce659274c37335cc911d089f2
'''

class Enjambre:

    def __init__(self, informacion_instancia):
        # Guarda las soluciones tentativas UNICAs
        self.diccionario_particulas = dict()
        # Guarda los datos relacionados con la instancia del problema
        self.informacion_instancia = informacion_instancia
        # Guarda la mejor solucion global encontrada
        self.mejor_solucion_global = np.array([math.inf] * self.informacion_instancia.tamano_instancia)
        # Guarda el fitness de la mejor solucion encontrada
        self.mejor_fitness = math.inf
        # Guarda las particulas
        self.lista_particulas = list()
        # Guarda un arreglo base de posiciones a partir de las cuales se permuta
        self.arreglo_base = list(range(self.informacion_instancia.tamano_instancia))

        # Definicion de constantes
        self.numero_particulas = 20
        # Maximo numero de iteraciones
        self.maximas_iteraciones = 100
        # Registro de iteraciones
        self.numero_iteraciones = 0

        self.tiempo_ejecucion = time.time()

    def ejecutar_pso(self):
        ''''
            Este metodo se encarga de encontrar la mejor solucion en base a la logica principal
            del PSO.

                Instanciar Particulas
                Mientras no se cumpla el maximo de iteraciones:
                    Para cada particula:
                        Calcular Fitness de Particula y Actualizar Mejor Personal
                    Calcular mejor global y Actualizar Mejor Fitness
                    Para Cada Particula:
                        Actualizar Velocidad
                        Actualizar Posicion
        '''
        # Poblamos el arreglo de particulas con una cantidad X de particulas
        for i in range(self.numero_particulas):
            self.lista_particulas.append(Particula(self.diccionario_particulas, self.arreglo_base))

        for i in range(self.maximas_iteraciones):
            self.numero_iteraciones+= 1
            for particula in self.lista_particulas:
                # Calcula fitness de cada particula y actualiza mejor personal
                particula.actualizar_mejor_personal(self.informacion_instancia.calcular(particula.solucion_tentativa))
            # updatiar mejor global
            for particula in self.lista_particulas:
                if particula.particle_fitness < self.mejor_fitness:
                    self.mejor_fitness = particula.particle_fitness
                    self.mejor_solucion_global = particula.solucion_tentativa

            # Actualizar Velocidad y Posicion
            for particula in self.lista_particulas:
                particula.actualizar_velocidad(self.mejor_solucion_global)
                particula.actualizar_posicion()
            # Cada 10 iteraciones se muestra el mejor fitness
            if i % 10 == 0:
                print('El mejor fitness actual es : ' + str(self.mejor_fitness)+"   numero de iteraciones = "+str(self.numero_iteraciones))
        # Se imprime la mejor solucion
        print("Numero de iteraciones alcanzadas: "+str(self.numero_iteraciones))
        print("Tiempo de ejecucion en segundos: ",  time.time()- self.tiempo_ejecucion)
        print("Mejor fitness: "+str(self.mejor_fitness))
        print(self.mostrar_solucion())

    def mostrar_solucion(self):
        cadena = '[ '
        for i in range(0, len(self.mejor_solucion_global)) :
            if (i + 1 == len(self.mejor_solucion_global)) : 
                cadena = cadena + str(self.mejor_solucion_global[i])
            else :
                cadena = cadena + str(self.mejor_solucion_global[i]) + ' , '
        cadena = cadena + ' ]'
        return cadena
