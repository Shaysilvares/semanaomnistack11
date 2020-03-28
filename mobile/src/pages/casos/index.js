import React, { usestate, useEffect, useState } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation} from '@react-navigation/native';
import api from '../../services/api';

import logoImg from '../../assets/logo.png';
import styles from '../casos/styles';

export default function Casos() {
    const [casos, setCasos] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);


    const navigation = useNavigation();

    function goToDetalhePage(caso) {
        navigation.navigate('Detalhes', { caso });
    }

    async function loadCasos() {
        if(loading) {
            return;
        }

        if(total > 0 && casos.length == total) {
            return;
        }

        setLoading(true);

        const response = await api.get('casos', {
            params: { page }
        });

        setCasos([... casos, ... response.data]);
        setTotal(response.headers['x-total-count']);
        setPage(page + 1);
        setLoading(false);
    }

    useEffect(() => {
        loadCasos();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} /> 
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}> {total} casos</Text>. 
                </Text>
            </View>

                <Text style={styles.title}>Bem-vindo!</Text>
                <Text style={styles.descricao}>Escolha um dos casos abaixo e salve o dia.</Text>

            <FlatList
                style={styles.casosList}
                data={casos}
                keyExtractor={caso => String(caso.id)}
                onEndReached={loadCasos}
                onEndReachedThreshold={0.2}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item: caso }) => (
                    <View style={styles.caso}>
                    <Text style={[styles.casoPropriedade, { marginTop:0 }]}>ONG: </Text>
                    <Text style={styles.casoValor}>{caso.nome} - {caso.cidade}, {caso.uf}</Text>

                    <Text style={styles.casoPropriedade}>CASO: </Text>
                    <Text style={styles.casoValor}>{caso.titulo}</Text>

                    <Text style={styles.casoPropriedade}>VALOR: </Text>
                    <Text style={styles.casoValor}>
                        {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
                    </Text>

                    <TouchableOpacity style={styles.detalhesCaso} onPress={() => {goToDetalhePage(caso)}}>
                        <Text style={styles.detalhesButtonText}>Ver mais detalhes</Text>
                        <Feather name="arrow-right" size={17} color="#e82041" />
                    </TouchableOpacity>
                </View>
                )}
            />        
        </View>
    );
}