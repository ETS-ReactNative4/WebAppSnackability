import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements'


export default class Snackability extends Component {
    UNSAFE_componentWillMount() {
    }

    render() {
        const snak0 = [
            {
                name: 'Cristina Palacios',
                avatar_url: 'https://i.imgur.com/WeG8mAm.png',
                subtitle: 'Associate Professor',
            },
            {
                name: 'Lukkamol Prapkre',
                avatar_url: 'https://i.imgur.com/B1Imo2h.png',
                subtitle: 'PhD Student',
            },
        ]

        const snak1 = [
            {
                name: 'Bérénice De La Mota',
                avatar_url: 'https://i.imgur.com/zp6PZsh.png',
                subtitle: 'Master Student',
            },
            {
                name: 'Bertha Perez',
                avatar_url: 'https://i.imgur.com/D5BJoDa.png',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Frank Hernandez',
                avatar_url: 'https://i.imgur.com/yVn4Nm4.png',
                subtitle: 'CS Undergrad',
            }
        ]

        const snak2 = [
            {
                name: 'Christian Canizares',
                avatar_url: 'https://i.imgur.com/RrmHwZM.jpg?1',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Carolina Karthik',
                avatar_url: 'https://i.imgur.com/ebxo6Mb.jpg?1',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Jessiel Benitez',
                avatar_url: 'https://i.imgur.com/zb7Ptcz.jpg',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Adrian Serrano',
                avatar_url: 'https://i.imgur.com/X0qXPqg.jpg?1',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Shafeeque Khan',
                avatar_url: 'https://i.imgur.com/5k8iHeo.jpg?1',
                subtitle: 'CS Undergrad',
            },
            {
                name: 'Jeffrey Antoine',
                avatar_url: 'https://i.imgur.com/kmrHmz8.png?1',
                subtitle: 'CS Undergrad',
            }
        ]

        const snak3=[
            {
                name: 'Darien Morrison',
                subtitle: 'CS Undergrad'
            },
            {
                name: 'Elias Garcia',
                subtitle: 'CS Undergrad'
            }
        ]

        const snak4=[
            {
                name: 'Mihail Canoski',
                avatar_url: 'https://i.imgur.com/dusVjNz.jpg[/img]',
                subtitle: 'CS Undergrad'
            },
            {
                name: 'Ivan Brenes',
                avatar_url: 'https://i.imgur.com/xuh9rJ7.jpg[/img]',
                subtitle: 'CS Undergrad'
            }
        ]

        //Snackability 5.0 Team
        const snak5=[
            {
                name: 'Ferris Mohammed',
                avatar_url: 'https://media-exp1.licdn.com/dms/image/C4E03AQGIUb_N9vEsiQ/profile-displayphoto-shrink_100_100/0?e=1611792000&v=beta&t=Enn6fYdkE28qUELY8nhkWqU4e7yuq3eNoPRuDFVsH6g',
                subtitle: 'CS Undergrad Capstone II'
            },
            {
                name: 'Gabby Acosta',
                avatar_url: 'https://media-exp1.licdn.com/dms/image/C4D03AQEZXFrCyQlW1w/profile-displayphoto-shrink_400_400/0/1607105347967?e=1612396800&v=beta&t=QOz6ANEKJqgG8It51NO1-CLQBX6-HmfEeqBAcMVr9jE',
                subtitle: 'CS Undergrad Capstone II'
            },
            {
                name: 'Susana Cruz Diaz',
                avatar_url: 'https://media-exp1.licdn.com/dms/image/C5635AQFedaSPiscTqg/profile-framedphoto-shrink_400_400/0/1595007078025?e=1607194800&v=beta&t=IRwQqdApG5MmZIFtNUg1dpj2O3PmZ7i4TMllvv_TVFc',
                subtitle: 'CS Undergrad Capstone II'
            },
            {
                name: 'Hanson Nguyen',
                avatar_url: 'https://media-exp1.licdn.com/dms/image/C5603AQEBuf7oEHYU0A/profile-displayphoto-shrink_200_200/0?e=1611792000&v=beta&t=2G-kw-bWeb0G0sZRmpjF6TGPu5GbROx65FHVk1W_Ywg',
                subtitle: 'CS Undergrad Capstone I'
            }
        ]



        return (
            <ScrollView>
            <View style={styles.container}>
                <Text style={styles.header2}>
                    Our Mission:
                </Text>
                <Text style={styles.textStyles}>
                The goal of Snackability app is to help you identify healthy snacks by providing a score from 0 (not healthy) to 10 (very healthy) to each snack searched in our app.
                </Text>

                <View>
                    {
                        snak0.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>

                <Text style={styles.header2}>
                {'\n'}Snackability 1.0 Team
                </Text>
                <View>
                    {
                        snak1.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>

                <Text style={styles.header2}>
                    {'\n'}Snackability 2.0 Team
                </Text>
                <View>
                    {
                        snak2.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>

                <Text style={styles.header2}>
                    {'\n'}Snackability 3.0 Team
                </Text>
                <View>
                    {
                        snak3.map((l, i) => (
                            <ListItem
                                roundAvatar
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>

                <Text style={styles.header2}>
                {'\n'}Snackability 4.0 Team
                </Text>
                <View>
                    {
                        snak4.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>
                <Text style={styles.header2}>
                {'\n'}Snackability 5.0 Team
                </Text>
                <View>
                    {
                        snak5.map((l, i) => (
                            <ListItem
                                roundAvatar
                                avatar={{ uri: l.avatar_url }}
                                key={i}
                                title={l.name}
                                subtitle={l.subtitle}
                                contact={l.contact}
                            />
                        ))
                    }
                </View>


                <Text style={styles.header2}>
                    {'\n'}Contact the Product Owner
                </Text>
                <Text style={styles.textStyles}>
                For questions or to provide feedback in regards to the Snackability app, please email Dr. Cristina Palacios:
                </Text>

                <Text style={styles.textStyles2}>
                crpalaci@fiu.edu
                </Text>

                <Text style={styles.textStyles2}>
                snackabilityapp@gmail.com
                </Text>


                {/* <InfoList /> */}
            </View>
            </ScrollView>
        );
    }
}

const styles = {
    container: {
        flex: 1
    },
    textStyles: {
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 14,
        marginBottom: 20
    },
    textStyles2: {
        paddingRight: 20,
        paddingLeft: 20,
        fontSize: 16,
        marginBottom: 20,
        textAlign: 'center'
    },
    header2: {
        textAlign: 'center',
        fontSize: 20,
        color: '#22C88A',
        marginVertical: 10,
        fontWeight: 'bold'
    }
};