import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform, ActivityIndicator, Alert, Keyboard } from 'react-native';
import { Link, router } from 'expo-router';
import { Lock, Mail, Eye, EyeOff, AlertCircle } from 'lucide-react-native';
import { colors } from '@/constants/Colors';
import * as Animatable from 'react-native-animatable';
import { auth } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);



  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => setKeyboardVisible(true)
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => setKeyboardVisible(false)
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '' };
    
    // Email validation
    if (!email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email';
      isValid = false;
    }
    
    // Password validation
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleLogin = async () => {
    setFormSubmitted(true);
    Keyboard.dismiss();

    if (!validateForm()) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setLoading(false);
      router.replace('/(tabs)');
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Authentication Failed', error.message || 'Invalid email or password. Please try again.');
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.keyboardAvoidingView}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <Animatable.View 
        style={styles.logoContainer}
        animation="fadeIn"
        duration={1000}
      >
        <Image 
          source={{ uri: 'https://images.pexels.com/photos/5473298/pexels-photo-5473298.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }} 
          style={styles.logoBackground}
        />
        <View style={styles.overlay} />
        <Animatable.Text 
          style={styles.logoText}
          animation="slideInDown"
          delay={300}
        >SecuVision</Animatable.Text>
        <Animatable.Text 
          style={styles.tagline}
          animation="fadeIn"
          delay={500}
        >Advanced Security Monitoring</Animatable.Text>
      </Animatable.View>
      
      <Animatable.View 
        style={[
          styles.formContainer, 
          keyboardVisible && styles.formContainerReduced,
          { flex: keyboardVisible ? 0 : 1 }
        ]}
        animation="fadeInUp"
        duration={800}
        delay={200}
      >
        <Text style={styles.title}>Sign In</Text>
        
        <View style={[styles.inputContainer, errors.email && formSubmitted && styles.inputError]}>
          <Mail size={20} color={errors.email && formSubmitted ? colors.alert : colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={colors.textSecondary}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
          />
        </View>
        {errors.email && formSubmitted && (
          <Animatable.View animation="fadeIn" duration={300} style={styles.errorContainer}>
            <AlertCircle size={14} color={colors.alert} />
            <Text style={styles.errorText}>{errors.email}</Text>
          </Animatable.View>
        )}
        
        <View style={[styles.inputContainer, errors.password && formSubmitted && styles.inputError]}>
          <Lock size={20} color={errors.password && formSubmitted ? colors.alert : colors.textSecondary} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={colors.textSecondary}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            autoComplete="password"
          />
          <TouchableOpacity 
            style={styles.eyeIcon} 
            onPress={() => setShowPassword(prev => !prev)}
          >
            {showPassword ? (
              <EyeOff size={20} color={colors.textSecondary} />
            ) : (
              <Eye size={20} color={colors.textSecondary} />
            )}
          </TouchableOpacity>
        </View>
        {errors.password && formSubmitted && (
          <Animatable.View animation="fadeIn" duration={300} style={styles.errorContainer}>
            <AlertCircle size={14} color={colors.alert} />
            <Text style={styles.errorText}>{errors.password}</Text>
          </Animatable.View>
        )}
        
        <Link href="/auth/forgot-password" asChild>
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>
        </Link>
        
        <TouchableOpacity 
          style={[styles.loginButton, loading && styles.loginButtonDisabled]}
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFFFFF" size="small" />
          ) : (
            <Animatable.Text 
              style={styles.loginButtonText}
              animation={formSubmitted && Object.values(errors).some(e => e) ? "shake" : undefined}
            >
              Sign In
            </Animatable.Text>
          )}
        </TouchableOpacity>
        

      </Animatable.View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: 16,
  },
  logoContainer: {
    height: 280,
    maxHeight: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    paddingHorizontal: 16,
  },
  logoBackground: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    opacity: 0.8,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.7)',
  },
  logoText: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#FFFFFF',
    zIndex: 1,
  },
  tagline: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginTop: 8,
    zIndex: 1,
  },
  formContainer: {
    flex: 1,
    backgroundColor: colors.cardBackground,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    paddingTop: 32,
    marginTop: -20,
    minHeight: 400,
  },
  formContainerReduced: {
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background,
    borderRadius: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
    height: 52,
    minHeight: 52,
  },
  inputError: {
    borderColor: colors.alert,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    marginLeft: 4,
  },
  errorText: {
    color: colors.alert,
    fontSize: 12,
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: colors.textPrimary,
  },
  eyeIcon: {
    padding: 8,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: colors.primary,
  },
  loginButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    height: 56,
    minHeight: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  loginButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  demoText: {
    textAlign: 'center',
    color: colors.textSecondary,
    fontSize: 12,
    marginBottom: 16,
    fontFamily: 'Inter-Regular',
  },

});