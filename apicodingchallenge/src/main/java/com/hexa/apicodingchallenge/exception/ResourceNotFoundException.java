package com.hexa.apicodingchallenge.exception;

public class ResourceNotFoundException extends Exception{

	private String resourceName;
	private String fieldName;
	private int fieldValue;

	public ResourceNotFoundException(String resourceName, String fieldName, int fieldValue) {
		super();
		this.resourceName = resourceName;
		this.fieldName = fieldName;
		this.fieldValue = fieldValue;
	}
	public String getMessage() {
		return this.resourceName+ " is not found with "+this.fieldName+" value "+this.fieldValue;
		
	}
	public String getResourceName() {
		return resourceName;
	}
	public void setResourceName(String resourceName) {
		this.resourceName = resourceName;
	}
	public String getFieldName() {
		return fieldName;
	}
	public void setFieldName(String fieldName) {
		this.fieldName = fieldName;
	}
	public int getFieldValue() {
		return fieldValue;
	}
	public void setFieldValue(int fieldValue) {
		this.fieldValue = fieldValue;
	}
	
	
	
}
