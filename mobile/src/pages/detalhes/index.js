import React from 'react';
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer  from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';

import styles from './styles';

export default function Detalhes() {
    const navigation = useNavigation();
    const route = useRoute();

    const caso = route.params.caso;
    const mensagem = `Olá ${caso.nome}, estou entrando em contato, pois gostaria de ajudar no caso "${caso.titulo}" com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}`;

    function navigateback() {
        navigation.goBack();
    }

    function enviarEmail() {
        MailComposer.composeAsync({
            subject: `Heroí do caso: ${caso.titulo}`,
            recipients: [caso.email],
            body: mensagem
        });
    }

    function enviarWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${caso.telefone}&text=${mensagem}`);
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} /> 
                <TouchableOpacity onPress={navigateback}>
                    <Feather name="arrow-left" size={28} color="#e82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.caso}>
                <Text style={[styles.casoPropriedade, {marginTop: 0}]}>ONG: </Text>
                <Text style={styles.casoValor}>{caso.nome} </Text>

                <Text style={styles.casoPropriedade}>CASO: </Text>
                <Text style={styles.casoValor}>{caso.descricao} </Text>

                <Text style={styles.casoPropriedade}>VALOR: </Text>
                <Text style={styles.casoValor}>
                    {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(caso.valor)}
                </Text>
            </View>

            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia</Text>
                <Text style={styles.heroTitle}>Seja o heroí desse caso</Text>
                <Text style={styles.heroDescricao}>Entre em contato</Text>

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={enviarWhatsapp}>
                        <Text style={styles.actionText}>WhatsApp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={enviarEmail}>
                        <Text style={styles.actionText}>Email</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}