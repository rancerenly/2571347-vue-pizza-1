import { expect, describe, it } from 'vitest';
import { validate, validateFields, clearValidationErrors } from '@/common/helpers/validator';

describe('validate', () => {
    it('Проверка, что функция возвращает сообщение об ошибке, если правило "required" применяется к пустому значению', () => {
        const result = validate('', ['required']);
        expect(result).toBe('Поле обязательно для заполнения');
    });

    it('Проверка, что функция не возвращает сообщение об ошибке для правила "required", если значение присутствует', () => {
        const result = validate('Some text', ['required']);
        expect(result).toBe('');
    });

    it('Проверка, что функция возвращает сообщение об ошибке для некорректного формата email', () => {
        const result = validate('invalid-email', ['email']);
        expect(result).toBe('Электронная почта имеет неверный формат');
    });

    it('Проверка, что функция не возвращает сообщение об ошибке для корректного формата email', () => {
        const result = validate('test@example.com', ['email']);
        expect(result).toBe('');
    });
});

describe('validateFields', () => {
    it('Проверка, что функция возвращает false, если есть ошибки валидации', () => {
        const fields = { email: '', password: 'password' };
        const validations = {
            email: { rules: ['required', 'email'], error: '' },
            password: { rules: ['required'], error: '' },
        };
        const isValid = validateFields(fields, validations);
        expect(isValid).toBe(false);
        expect(validations.email.error).toBe('Поле обязательно для заполнения');
        expect(validations.password.error).toBe('');
    });

    it('Проверка, что функция возвращает true, если все поля прошли валидацию', () => {
        const fields = { email: 'test@example.com', password: 'password' };
        const validations = {
            email: { rules: ['required', 'email'], error: '' },
            password: { rules: ['required'], error: '' },
        };
        const isValid = validateFields(fields, validations);
        expect(isValid).toBe(true);
        expect(validations.email.error).toBe('');
        expect(validations.password.error).toBe('');
    });
});

describe('clearValidationErrors', () => {
    it('Проверка, что функция очищает ошибки валидации', () => {
        const validations = {
            email: { rules: ['required', 'email'], error: 'Поле обязательно для заполнения' },
            password: { rules: ['required'], error: '' },
        };
        clearValidationErrors(validations);
        expect(validations.email.error).toBe('');
        expect(validations.password.error).toBe('');
    });

    it('Проверка, что функция не вызывает ошибку, если переданы пустые или неопределенные валидации', () => {
        expect(() => clearValidationErrors()).not.toThrow();
        expect(() => clearValidationErrors({})).not.toThrow();
    });
});

