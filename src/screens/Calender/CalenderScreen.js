import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';
import {Calendar, Agenda} from 'react-native-calendars';
import {Button} from 'react-native-elements';

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

export default class CalenderScreen extends React.Component {

    _onPressButton = () => {
        this.props.navigation.navigate('Notification');
    }

    render() {
        return (
            <View style={styles.container}>
                {/*<Calendar*/}
                {/*    current={'2012-03-01'}*/}
                {/*    onDayPress={(day) => {*/}
                {/*        console.log('selected day', day);*/}
                {/*    }}*/}
                {/*    onMonthChange={(month) => {*/}
                {/*        console.log('month changed', month);*/}
                {/*    }}*/}
                {/*    theme={{*/}
                {/*        selectedDayBackgroundColor: 'red',*/}
                {/*    }}*/}
                {/*>*/}
                {/*</Calendar>*/}
                <Calendar
                    markedDates={{
                        // '2020-02-19': {dots: [vacation, massage, workout], selected: true, selectedColor: 'red'},
                        // '2020-02-20': {dots: [massage, workout], disabled: true},
                        '2020-02-21': {textColor: 'green'},
                        '2020-02-22': {startingDay: true, color: 'green'},
                        '2020-02-23': {selected: true, endingDay: true, color: 'green', textColor: 'gray'},
                        '2020-02-24': {disabled: true, startingDay: true, color: 'green', endingDay: true}
                    }}
                    markingType={'period'}
                />
                {/*<Agenda*/}
                {/*    // The list of items that have to be displayed in agenda. If you want to render item as empty date*/}
                {/*    // the value of date key has to be an empty array []. If there exists no value for date key it is*/}
                {/*    // considered that the date in question is not yet loaded*/}
                {/*    items={{*/}
                {/*        '2020-02-19': [{name: 'item 1 - any js object'}],*/}
                {/*        '2020-02-20': [{name: 'item 2 - any js object', height: 80}],*/}
                {/*        '2020-02-21': [],*/}
                {/*        '2020-02-22': [{name: 'item 3 - any js object'}, {name: 'any js object'}]*/}
                {/*    }}*/}
                {/*    // Callback that gets called when items for a certain month should be loaded (month became visible)*/}
                {/*    loadItemsForMonth={(month) => {console.log('trigger items loading')}}*/}
                {/*    // Callback that fires when the calendar is opened or closed*/}
                {/*    onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}*/}
                {/*    // Callback that gets called on day press*/}
                {/*    onDayPress={(day)=>{console.log('day pressed')}}*/}
                {/*    // Callback that gets called when day changes while scrolling agenda list*/}
                {/*    onDayChange={(day)=>{console.log('day changed')}}*/}
                {/*    // Initially selected day*/}
                {/*    selected={'2020-02-19'}*/}
                {/*    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined*/}
                {/*    minDate={'2020-02-01'}*/}
                {/*    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined*/}
                {/*    maxDate={'2020-02-29'}*/}
                {/*    // Max amount of months allowed to scroll to the past. Default = 50*/}
                {/*    pastScrollRange={50}*/}
                {/*    // Max amount of months allowed to scroll to the future. Default = 50*/}
                {/*    futureScrollRange={50}*/}
                {/*    // Specify how each item should be rendered in agenda*/}
                {/*    renderItem={(item, firstItemInDay) => {return (<View />);}}*/}
                {/*    // Specify how each date should be rendered. day can be undefined if the item is not first in that day.*/}
                {/*    renderDay={(day, item) => {return (<View />);}}*/}
                {/*    // Specify how empty date content with no items should be rendered*/}
                {/*    renderEmptyDate={() => {return (<View />);}}*/}
                {/*    // Specify how agenda knob should look like*/}
                {/*    renderKnob={() => {return (<View />);}}*/}
                {/*    // Specify what should be rendered instead of ActivityIndicator*/}
                {/*    renderEmptyData = {() => {return (<View />);}}*/}
                {/*    // Specify your item comparison function for increased performance*/}
                {/*    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}*/}
                {/*    // Hide knob button. Default = false*/}
                {/*    hideKnob={true}*/}
                {/*    // By default, agenda dates are marked if they have at least one item, but you can override this if needed*/}
                {/*    markedDates={{*/}
                {/*        '2020-02-20': {selected: true, marked: true},*/}
                {/*        '2020-02-21': {marked: true},*/}
                {/*        '2020-02-22': {disabled: true}*/}
                {/*    }}*/}
                {/*    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false*/}
                {/*    disabledByDefault={true}*/}
                {/*    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.*/}
                {/*    onRefresh={() => console.log('refreshing...')}*/}
                {/*    // Set this true while waiting for new data from a refresh*/}
                {/*    refreshing={false}*/}
                {/*    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.*/}
                {/*    refreshControl={null}*/}
                {/*    // Agenda theme*/}
                {/*    theme={{*/}
                {/*        // ...calendarTheme,*/}
                {/*        agendaDayTextColor: 'yellow',*/}
                {/*        agendaDayNumColor: 'green',*/}
                {/*        agendaTodayColor: 'red',*/}
                {/*        agendaKnobColor: 'blue'*/}
                {/*    }}*/}
                {/*    // Agenda container style*/}
                {/*    style={{}}*/}
                {/*/>*/}
                <Button
                    title="Notification"
                    type="outline"
                    onPress={this._onPressButton}
                />
            </View>
        );
    }


}
