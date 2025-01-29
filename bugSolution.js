The solution involves improving error handling.  Instead of simply catching the error and logging a generic message, we will try to extract more information and provide a more descriptive message to the user:

```javascript
import * as DocumentPicker from 'expo-document-picker';

export default function App() {
  const [result, setResult] = React.useState(null);

  const pickDocument = async () => {
    try {
      const res = await DocumentPicker.getDocumentAsync({});
      if (res.type === 'cancel') {
        setResult('Cancelled');
      } else if (res.error) {
        setResult(`Error picking document: ${JSON.stringify(res.error)}`);
      } else {
        setResult(res.uri);
      }
    } catch (error) {
      setResult(`Error: ${error.message ? error.message : 'An unknown error occurred'}`);
    }
  };

  return (
    <View>
      <Button title="Pick a file" onPress={pickDocument} />
      <Text>{result}</Text>
    </View>
  );
}
```
This revised code attempts to get more information from the error object itself, or displays a more helpful generic error message if specific error information isn't available.