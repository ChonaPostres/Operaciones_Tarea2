from srflp.reader import SRFLP
from pso.enjambre import Enjambre

''''
    Archivos para ejecutar:
    - S5.txt
    - S8
    - S10
    - QAP_sko56_04_n.txt
    - QAP_sko100_04_n.txt
    - SRFLP_Rubio_AnKeVa_500_03.txt
    - SRFLP2_N_110_L_5_14_F_0_100.txt
'''

if __name__ == '__main__':
    filename = input("Ingrese archivo para procesar: ")
    directionFile = 'instancias/'+filename
    print("Iniciando proceso PSO")
    enjambre = Enjambre(SRFLP(directionFile)).ejecutar_pso()