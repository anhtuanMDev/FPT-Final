import React, { useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';

interface Option {
  key: string;
  label: string;
}

interface Props {
  options: Option[];
  onSelect: (option: Option) => void;
}

const CustomDropdown: React.FC<Props> = ({ options, onSelect }) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (item: Option) => {
    setSelectedOption(item);
    onSelect(item);
    setIsVisible(false);
  };

  return (
    <View style={{ position: 'relative', zIndex: 1 }}>
      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <Text>Select an option</Text>
      </TouchableOpacity>
      {isVisible && (
        <View style={{ position: 'absolute', top: 30, left: 0, right: 0, backgroundColor: 'white', zIndex: 2 }}>
          <FlatList
            data={options}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </View>
  );
};

// Usage
const MyComponent: React.FC = () => {
  const options: Option[] = [
    { key: '1', label: 'Option 1' },
    { key: '2', label: 'Option 2' },
    { key: '3', label: 'Option 3' },
  ];
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);

  const handleSelect = (item: Option) => {
    console.log("Selected option:", item);
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <CustomDropdown options={options} onSelect={handleSelect} />
      {selectedOption && <Text>Selected option: {selectedOption.label}</Text>}
    </View>
  );
};

export default MyComponent;