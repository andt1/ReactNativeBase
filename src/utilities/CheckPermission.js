import {Alert, PermissionsAndroid, Platform} from 'react-native';
import {
    check, PERMISSIONS, RESULTS, request, openSettings
} from 'react-native-permissions';

let hasCameraPermission = true;

class CheckPermission {

    constructor() {
        return (async () => {
            // All async code here
            this.value = await this.checkPermission();
            this.hasCameraPermission = hasCameraPermission;
            return this; // when done
        })();
    }

    checkPermission = async () => {
        if (Platform.OS !== 'ios') {
            await this.requestCameraPermission();
            await this.requestPhotoLibraryPermission();
        } else {
            await this.requestPermissionCameraIOS();
        }
    };

    /** ios camera */
    requestPermissionCameraIOS= async () => {
        await request(PERMISSIONS.IOS.CAMERA);
        await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
        Promise.all([
            check(PERMISSIONS.IOS.CAMERA),
            check(PERMISSIONS.IOS.PHOTO_LIBRARY),
        ]).then(([cameraStatus, photoLibraryStatus]) => {
            if (cameraStatus !== RESULTS.GRANTED) {
                this._alertForCameraPermission();
            } else if (photoLibraryStatus !== RESULTS.GRANTED) {
                this._alertForPhotosPermission();
            }
        });
    };

    /** end  camera  */
    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'App Camera Permission',
                    message: 'Bạn cần cấp quyền truy cập camera để thực hiện chức năng chụp ảnh',
                    buttonPositive: 'Đồng ý',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                hasCameraPermission = true;
            } else {
                hasCameraPermission = false;
            }
            return hasCameraPermission;
        } catch (err) {
            console.warn(err);
        }
    };

    /** request permission photo library  */
    requestPhotoLibraryPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                {
                    title: 'App Permission',
                    message: 'Bạn cần cấp quyền đọc ghi bộ nhớ',
                    buttonPositive: 'Đồng ý',
                },
            )
        } catch (e) {
            console.warn(e);
        }
    };

    _alertForCameraPermission = () => {
        Alert.alert(
            'Cho phép truy cập camera?',
            'Bạn cần cấp quyền truy cập camera để thực hiện chức năng chụp ảnh!',
            [
                {
                    text: 'Hủy bỏ',
                    style: 'cancel',
                },
                {text: 'Mở cài đặt', onPress: openSettings},
            ],
        );
    };

    _alertForPhotosPermission = () => {
        Alert.alert(
            'Cho phép truy cập thư viện ảnh?',
            'Bạn cần cấp quyền truy cập thư viện ảnh để có thể lưu ảnh và chọn ảnh từ thiết bị',
            [
                {
                    text: 'Hủy bỏ',
                    style: 'cancel',
                },
                {text: 'Mở cài đặt', onPress: openSettings},
            ],
        );
    };

}

export default CheckPermission;
